package com.team.todaycheck.main.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMissionCertification is a Querydsl query type for MissionCertification
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMissionCertification extends EntityPathBase<MissionCertification> {

    private static final long serialVersionUID = 1837059719L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMissionCertification missionCertification = new QMissionCertification("missionCertification");

    public final DateTimePath<java.util.Date> checkDate = createDateTime("checkDate", java.util.Date.class);

    public final StringPath image = createString("image");

    public final NumberPath<Long> keys = createNumber("keys", Long.class);

    public final QParticipantsMission participantsMission;

    public final StringPath userName = createString("userName");

    public QMissionCertification(String variable) {
        this(MissionCertification.class, forVariable(variable), INITS);
    }

    public QMissionCertification(Path<? extends MissionCertification> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMissionCertification(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMissionCertification(PathMetadata metadata, PathInits inits) {
        this(MissionCertification.class, metadata, inits);
    }

    public QMissionCertification(Class<? extends MissionCertification> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.participantsMission = inits.isInitialized("participantsMission") ? new QParticipantsMission(forProperty("participantsMission"), inits.get("participantsMission")) : null;
    }

}

